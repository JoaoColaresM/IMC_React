import styles from './cabecalho.module.css'

const Cabecalho = () => {
    return (
        <header className={styles.header}>
            <span className="material-symbols-outlined">balance</span>
            <h1 className={styles.name}>Calculadora IMC</h1>
        </header>
    )
}

export default Cabecalho;