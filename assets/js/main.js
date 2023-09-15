/*

Validando formulario...

*/ 

(function() {



class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario'); // capta o formulario a partir da classe


        this.eventos(); // chama o metodo de eventos
    }

    eventos() {
        // adicionando event listener
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e); // chamando a funcao handleSubmit() e passando o evento como argumento
        });
    }

    handleSubmit(e) {
        e.preventDefault(); // funcao trava o envio do formulario

        const camposValidos = this.camposSaoValidos(); // dispara funcao checando se campos sao validos

        const senhasValidas = this.senhaValida();

    }

    camposSaoValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validandoPermissoes')) {
            if(!campo.value) {
                const label = campo.previousElementSibling.innerText;
                this.criaErro(campo, `${label} nao pode estar em branco`);
                valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }

    criaErro(campo, mensagemDeErro) {
        const div = document.createElement('div');
        div.innerHTML = mensagemDeErro;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

    // validando nome de usuario com RegEx
    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Tamanho nao esta de acordo');
            valid = false;
        }

        if(!usuario.match(/[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Usuario precisa de letras e numeros');
            valid = false;
        }

        return true;
    }

    // validando as senhas
    senhaValida() {
        let valid = true;

        const senha = document.querySelector('.senha');
        const repeteSenha = document.querySelector('.repetirSenha');

        if(senha.value !== repeteSenha.value) {
            valid = false;
            this.criaErro(senha, 'Senhas diferentes!');
            this.criaErro(repeteSenha, 'Senhas diferentes!');
        }

        if(senha.value.length < 6) {
            valid = false;
            this.criaErro(senha, 'Senhas precisa de pelo menos 6 caracteres!');
        }

        if(!senha.match(/[a-zA-Z0-9]/g)) {
            valid = false;
            this.criaErro(senha, 'A senha precisa de letras e numeros!');
        }

        return valid;
    }
}

const validaForm = new ValidaFormulario(); // cria nova instancia da classe de validacao


})();

