"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/lib/types';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        if (params.id) {
            fetch(`/api/products/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) return <div className="container" style={{ paddingTop: '40px' }}>Loading tool details...</div>;
    if (!product) return <div className="container">Product not found.</div>;

    return (
        <div className={styles.page}>
            <div className={`container ${styles.layout}`}>
                <div className={styles.imageSection}>
                    <div className={styles.imagePlaceholder} style={{ backgroundImage: `url(${product.image})` }} />
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.badge}>{product.category}</div>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>${product.price}</p>
                    <div className={styles.divider} />

                    <p className={styles.description}>{product.description}</p>

                    <ul className={styles.features}>
                        {product.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>

                    <button onClick={() => addToCart(product)} className={styles.buyBtn}>
                        Add to Access List — ${product.price}
                    </button>
                </div>
            </div>
        </div>
    );
}
