import React, { useState, useEffect } from "react";
import styles from "./formulario.module.css";
import { calcularIMC, msgTexto } from "../Formula";

const Formulario = () => {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [IMCData, setIMCData] = useState(null);

    useEffect(() => {
        if (IMCData) {
            console.log("IMCData mudou:", IMCData);
        }
    }, [IMCData]);

    const handlePesoChange = (e) => {
        const valor = e.target.value;
        if (valor < 0) {
            setPeso("");
        } else {
            setPeso(valor);
        }
    };

    const handleAlturaChange = (e) => {
        const valor = e.target.value;
        if (valor < 0) {
            setAltura("");
        } else {
            setAltura(valor);
        }
    };

    const resultadoIMC = () => {
        try {
            const pesoNumber = parseFloat(peso.replace(",", "."));
            const alturaNumber = parseFloat(altura.replace(",", ".")) / 100;

            if (isNaN(pesoNumber) || isNaN(alturaNumber) || pesoNumber < 0 || alturaNumber < 0) {
                throw new Error("OBS: você precisa preencher os campos com números válidos");
            }

            if (pesoNumber < 2 || pesoNumber > 500) {
                throw new Error("OBS: o peso precisa ser maior que 2Kg e menor que 500kg");
            }

            if (alturaNumber < 0.5 || alturaNumber > 2.5) {
                throw new Error("OBS: a altura precisa ser maior que 50cm e menor que 2,5m");
            }

            const IMC = calcularIMC(pesoNumber, alturaNumber).toFixed(2);
            const IMCResultText = msgTexto(IMC);

            setIMCData({
                peso: pesoNumber,
                altura: alturaNumber,
                IMC: parseFloat(IMC, 2),
                result: IMCResultText,
            });


            setPeso("");
            setAltura("");
        } catch (error) {
            alert(error.message);

            setPeso("");
            setAltura("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resultadoIMC();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="container">
                <div className={styles.formulario}>
                    <div className={styles.dados}>
                        <label>Peso (Kg)</label>
                        <input type="number" value={peso} onChange={handlePesoChange}/>
                        <label>Altura (cm)</label>
                        <input type="number" value={altura} onChange={handleAlturaChange}/>
                    </div>
                    <div>
                        <button type="submit">Calcular</button>
                    </div>
                </div>
            </form>
            {IMCData ? (
                <table className="container">
                    <tbody className={styles.tabela}>
                        <tr>
                            <td>Peso</td>
                            <td>Altura</td>
                            <td>IMC</td>
                            <td>Resultado</td>
                        </tr>
                        <tr>
                            <td>{IMCData.peso}</td>
                            <td>{IMCData.altura}</td>
                            <td>{IMCData.IMC}</td>
                            <td className={styles.destaque}>{IMCData.result}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p className="container">Calcule seu IMC!</p>
            )}
        </>
    );
};

export default Formulario;