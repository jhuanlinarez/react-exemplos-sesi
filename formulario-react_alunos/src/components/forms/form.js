//Importa o React e os hooks necessários do React
import React, {useState} from 'react';
//Importa o hook useForm do react-hook-form para lidar com formulários de maneira eficiente
//Obs:Para instalar (npm install react-hook-form)
import {useForm} from 'react-hook-form';
//importa o arquivo de estilos CSS
import '../css/style.css';
//importa a imagem de fundo do login
import minhaImagem from '../images/login.jpg';
//importa a imagem de verificação
import verified from '../images/verified.png';
//função principal que representa o componente do formulário
function MyForm() {
    //destruturação do objeto retornado pelo hook useForm
    //formState é um onjeto que contém o estado do formulário, e erros é uma propriedade desse objeto
    const { register, handleSubmit, formState: {errors} } = useForm();
    //estado local para controlar o estado do formulário
    const [status, setStatus] = useState({submittedSuccessfully: false, loading: false, showPassword: false});
//função que é chamada quando o formulário é enviado
    const onSubmit = data => {
        //{...status}: O operador de propagação (...) é utilizado para criar uma cópia do estado (status). Isso é feito para garantir que não estamos modificando diretamente o estado anteriormente respeitando o príncipio de imutabilidade no React.
        setStatus({...status, loading: true}) //Atualiza o estado para indicar que está a carregar

        //simula um tempo de espera antes de atualizar o estado para sucesso
        setTimeout(() => {
            setStatus({ submitedSuccessfully: true, loading: false});
        }, 1000);
    };
//função para gerar mensagens de erro com base no nome do campo
    const generateErrorMessage = fieldName => {
        return {
            required: `${fieldName} é obrigatório`, //mensagem para campos obrigatótios
            pattern: fieldName === 'email' ? 'Formato de e-mail enválido' : null //mensagem para formato de e-mail inválido
        };
    };

    //função para lidar com o retorno á página inicial
    const handleReturnButtonClick = () => {
        //redireciona para a pagina inicial
        window.location.href = '/';
    };




    //renderização condicional (usando ternário ?) com base no sucesso do envio do formulário
    return (
        <div className='container'>
            {status.submittedSuccessfully ? (
                //se o formulário foi enviado com sucesso, exibe uma mensagem de sucesso
                <div className='success-message'>
                    <img src={verified} alt='Verificado' />
                    <h2>Formulário Enviado com Sucesso!</h2>
                    <p>Obrigado por enviar o formulário.</p>
                    <button className='btn' onClick={handleReturnButtonClick}>Retornar</button>
                </div>
            ) : (
                //se o formuláro não foi enviado com sucesso, exibe o formulário para preenchimento
                <div className='form-sign-up'>
                    <div>
                        <img src={minhaImagem} alt='imagem de uma pessoa se cadastrando pelo celular' />
                    </div>

                    <section>
                        <h1>Inscreva-se</h1>

                        {/*Formulário com campos controlados pelo hook useForm*/}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/*Campo Nome*/}
                            <div className='form flex'>
                                <label htmlFor='nome'>Nome</label>
                                <input
                                {...register("firtsName", generateErrorMessage("Nome"))}
                                placeholder="Nome"
                                id='name'
                                autoComplete='off'
                                className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className='error-message'>{errors.firstName.message}</span>}
                            </div>

                            {/*Campo Sobrenome*/}
                            <div className='form flex'>
                                <label htmlFor='sobrenome'>Sobrenome</label>
                                <input
                                {...register("lastName", generateErrorMessage("Sobrenome"))}
                                placeholder="Sobrenome"
                                id='sobrenome'
                                autoComplete='off'
                                className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
                            </div>

                            {/*Campo email*/}
                            <div className='form flex'>
                                <label htmlFor='email'>E-mail</label>
                                <input
                                {...register("email", generateErrorMessage("E-mail"))}
                                placeholder="E-mail"
                                id='email'
                                autoComplete='off'
                                className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className='error-message'>{errors.email.message}</span>}
                            </div>

                            {/*Campo senha*/}
                            <div className='form flex'>
                                <label htmlFor='password'>Senha</label>
                                <div className="password-input-container">
                                <input
                                {...register("password", generateErrorMessage("Senha"))}
                                placeholder="Senha"
                                id='password'
                                autoComplete='off'
                                type={status.showPassword ? 'text' : 'password'}
                                className={errors.password ? 'error' : ''}
                                />

                                <button
                                type="button" //define o tipo de botão com "button" para evitar comportamento padrão de envio de formulário
                                className='password-toggle'//adiciona a classe CSS 'password-toggle' para estilização específica
                                onClick={() => setStatus({...status, showPassword: !status.showPassword})}
                                //define a função de clique que atualiza o estado 'status', alternando o valor de 'showPassword'
                                >

                            {status.showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                {/*renderiza condicionalemnte um ícone de olho abertou ou fechado com base no valor de 'showPassword'*/}
                                </button>
                               
                        </div>
                                {errors.password && <span className='error-message'>{errors.password.message}</span>}
                            </div>

                            {/*Botão enviar*/}
                            <button className='btn' type="submit" disabled={status.loading}>{status.loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>
                        {status.loading && <p>Carregando...</p>}
                    </section>
                </div>
            )}
        </div>
    );
}

//Exporta componente "MyForm"
export default MyForm;