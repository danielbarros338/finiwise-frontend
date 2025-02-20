<template>
  <div class="login-page">
    <!-- Div para a imagem de fundo com efeito de blur -->
    <div class="bg-image"></div>

    <!-- Container para o conteúdo (card de login) -->
    <div class="login-container">
      <img
        src="/src/assets/img/finiwise-logo.png"
        alt="Logo"
        width="200px"
        class="q-mb-md logo-img"
      />

      <q-card class="login-card">
        <!-- Cabeçalho do card -->
        <q-card-section class="text-center">
          <div class="text-h5">Bem-vindo</div>
          <div class="text-subtitle2">Faça login para continuar</div>
        </q-card-section>

        <!-- Inputs de usuário e senha -->
        <q-card-section>
          <q-input
            outlined
            v-model="username"
            label="Usuário"
            label-color="white"
            class="q-mb-md"
            dense
            autofocus
            dark
          />
          <q-input
            outlined
            v-model="password"
            label="Senha"
            label-color="white"
            type="password"
            dense
            dark
          />
        </q-card-section>

        <!-- Botões de ação -->
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-btn class="q-mb-sm" style="width: 100%" label="Entrar" flat @click="login" to="/" />
            <q-btn style="width: 100%" label="Registrar" color="orange" to="register" />
          </div>
        </q-card-section>

        <!-- Link para recuperar senha -->
        <q-card-section class="text-center">
          <a class="link" href="#" @click.prevent="forgotPassword">Esqueci minha senha</a>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const username = ref<string>('')
    const password = ref<string>('')

    const login = () => {
      console.log('Logando com usuário:', username.value, 'e senha:', password.value)
      // Implemente a lógica de autenticação aqui
    }

    const register = () => {
      console.log('Redirecionando para a página de registro')
      // Implemente o redirecionamento para registro aqui
    }

    const forgotPassword = () => {
      console.log('Redirecionando para recuperação de senha')
      // Implemente o fluxo de recuperação de senha aqui
    }

    return {
      username,
      password,
      login,
      register,
      forgotPassword,
    }
  },
})
</script>

<style scoped>
/* Container principal da página */
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Div com a imagem de fundo com efeito blur */
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('assets/img/login-background.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(2px); /* Ajuste o valor conforme desejado */
  z-index: 0;
}

/* Container que centraliza o conteúdo da página */
.login-container {
  position: relative;
  z-index: 1; /* Garante que o conteúdo fique sobre a imagem */
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

/* Estilo para o card de login */
.login-card {
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
  width: 100%;
  color: #fff;
}

.logo-img {
  border-radius: 20px;
  box-shadow: 0 0 8px #464545;
}

.link {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
</style>
