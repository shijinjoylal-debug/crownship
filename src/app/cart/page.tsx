"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CartPage() {
    const { items, removeFromCart, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className="container">
                    <h1>Your Cart is Empty</h1>
                    <p>Ready to upgrade your trading?</p>
                    <Link href="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
                        Browse Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className="container">
                <h1 className={styles.title}>Your Cart</h1>

                <div className={styles.grid}>
                    <div className={styles.items}>
                        {items.map(item => (
                            <div key={item.id} className={`glass-panel ${styles.item}`}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className={styles.info}>
                                    <h3>{item.name}</h3>
                                    <p className={styles.category}>{item.category}</p>
                                </div>
                                <div className={styles.pricing}>
                                    <div className={styles.price}>${item.price}</div>
                                    <div className={styles.qty}>Qty: {item.quantity}</div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summaryContainer}>
                        <div className={`glass-panel ${styles.summary}`}>
                            <h2>Order Summary</h2>
                            <div className={styles.row}>
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Tax (0%)</span>
                                <span>$0</span>
                            </div>
                            <div className={styles.divider} />
                            <div className={`${styles.row} ${styles.total}`}>
                                <span>Total</span>
                                <span>${total}</span>
                            </div>

                            <Link href="/checkout" className={styles.checkoutBtn}>
                                Proceed to Checkout
                            </Link>

                            <button onClick={clearCart} className={styles.clearBtn}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
