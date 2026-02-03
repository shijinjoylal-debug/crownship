"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Crownship
                </Link>
                <div className={styles.links}>
                    <Link href="/shop" className={styles.link}>Marketplace</Link>
                    <Link href="/cart" className={styles.link}>Cart</Link>
                    <Link href="/login" className={styles.loginBtn}>Login</Link>
                </div>
            </div>
        </nav>
    );
}
