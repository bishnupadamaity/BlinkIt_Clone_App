import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface CartItem {
    _id: string | number;
    item: any;
    count: number;
}
interface CartStore {
    cart: CartItem[];
    addItem: (item: any) => void;
    removeItem: (id: string | number) => void;
    clearCart: () => void;
    getIemCount: (id: string | number) => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addItem: item => {
                const currentCart = get().cart;
                const existingItemIndex = currentCart.findIndex(
                    (cartItem: { _id: any }) => cartItem?._id === item?._id,
                );
                if (existingItemIndex >= 0) {
                    const updatedCart = [...currentCart];
                    updatedCart[existingItemIndex] = {
                        ...updatedCart[existingItemIndex],
                        count: updatedCart[existingItemIndex].count + 1,
                    };
                    set({ cart: updatedCart });
                } else {
                    set({ cart: [...currentCart, { _id: item._id, item: item, count: 1 }] });
                }
            },
            removeItem: id => {
                const currentCart = get().cart;
                const existingItemIndex = currentCart.findIndex(
                    (cartItem: { _id: any }) => cartItem?._id === id,
                );
                if (existingItemIndex >= 0) {
                    const updatedCart = [...currentCart];
                    if (updatedCart[existingItemIndex].count === 1) {
                        updatedCart.splice(existingItemIndex, 1);
                    } else {
                        updatedCart[existingItemIndex] = {
                            ...updatedCart[existingItemIndex],
                            count: updatedCart[existingItemIndex].count - 1,
                        };
                    }
                    set({ cart: updatedCart });
                }
            },
            clearCart: () => set({ cart: [] }),
            getIemCount: id => {
                const currentCart = get().cart;
                const existingItem = currentCart.find(
                    (cartItem: { _id: any }) => cartItem?._id === id,
                );
                if (existingItem) {
                    return existingItem.count;
                } else {
                    return 0;
                }
            },
            getTotalPrice: () => {
                const currentCart = get().cart;
                let total = 0;
                currentCart.forEach(
                    (cartItem: { count: number; item: { price: number } }) => {
                        total += cartItem.count * cartItem.item.price;
                    },
                );
                return total;
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
);
