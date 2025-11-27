import "./FrecuentQuestions.css"

export function FrecuentQuestions () {
    
    return (
        <div className="divFrecuentQuestions">
            <h1 className="titleQuestions">Preguntas Frecuentes</h1>
            <section className="whatIsSolidataBox">
                <h2>¿Qué es Solidata?</h2>
                <p>
                    Solidata es una plafaforma solidaria para administrar y conectar donaciones
                    de alimentos no perecederos entre personas u organizadores
                </p>
            </section>
            <section className="whatIsSolidataBox">
                <h2>¿Cómo me registro?</h2>
                <p>
                    Podés registrarte creando una cuenta con tus datos básicos (nombre, correo y contraseña).
                     <br /> Según el rol, podés ser: <br />
                     . Donante, para ofrecer alimentos <br />
                     . Receptor, para solicitarlos <br />
                     . Administrador, para controlar el sistema <br />
                </p>
            </section>
            <section className="whatIsSolidataBox">
                <h2>¿Es seguro usar Solidata?</h2>
                <p>
                    Sí. Solidata protege los datos de los usuarios con login seguro, contraseñas cifradas y 
                    validación de identidad. Además, no maneja dinero, solo gestiona información sobre las 
                    donaciones de alimentos.
                </p>
            </section>
            <section className="whatIsSolidataBox">
                <h2>¿Qué tipos de donaciones se aceptan?</h2>
                <p>
                    Solo se aceptan alimentos no perecederos, como: <br />
                    . Arroz, fideos, lentejas <br />
                    . Harina, Azúcar, Yerba, Aceite <br />
                    . Enlatados o productos secos
                </p>
            </section>
            <section className="whatIsSolidataBox">
                <h2>¿Cómo funciona el mapa interactivo?</h2>
                <p>
                    El mapa interactivo muestra los puntos de donación y organizaciones cercanas <br />
                    Permite: <br />
                    . Ver dónde hay solicitudes activas <br />
                    . Encontrar donantes o receptores por la zona <br />
                    . Filtrar por tipo de alimentos o distancia
                </p>
            </section>
        </div> 
    )
}

export default FrecuentQuestions