<template>
  <div class="register-page">
    <!-- Div para a imagem de fundo com efeito de blur -->
    <div class="bg-image"></div>

    <!-- Container para o conteúdo do registro -->
    <div class="register-container">
      <q-card class="q-pa-md register-card">
        <!-- Cabeçalho do card -->
        <q-card-section class="text-center">
          <div class="text-h5">Registro</div>
          <div class="text-subtitle2">Crie sua conta</div>
        </q-card-section>

        <!-- Campos de registro -->
        <q-card-section>
          <q-input
            outlined
            v-model="username"
            class="q-mb-md"
            label="Usuário"
            label-color="white"
            dense
            autofocus
            dark
          />
          <q-input
            outlined
            v-model="email"
            class="q-mb-md"
            label="Email"
            label-color="white"
            type="email"
            dense
            dark
          />
          <q-input
            outlined
            v-model="password"
            class="q-mb-md"
            label="Senha"
            label-color="white"
            type="password"
            dense
            dark
          />
          <q-input
            outlined
            v-model="confirmPassword"
            label="Confirmar Senha"
            label-color="white"
            type="password"
            dense
            dark
          />
        </q-card-section>

        <!-- Botões de ação -->
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-btn
              class="q-mb-sm"
              style="width: 100%"
              label="Registrar"
              color="orange"
              @click="register"
            />
            <q-btn style="width: 100%" label="Voltar para Login" flat to="login" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const username = ref<string>('')
    const email = ref<string>('')
    const password = ref<string>('')
    const confirmPassword = ref<string>('')

    // Função para realizar o registro
    const register = () => {
      if (password.value !== confirmPassword.value) {
        console.error('Senha e confirmar senha não coincidem')
        // Aqui você pode implementar uma notificação para o usuário
        return
      }
      console.log('Registrando usuário:', username.value, 'Email:', email.value)
      // Implemente a lógica de registro da conta aqui
    }

    // Função para voltar à tela de login
    const goToLogin = () => {
      console.log('Redirecionando para a tela de login')
      // Implemente a navegação para a página de login aqui
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      register,
      goToLogin,
    }
  },
})
</script>

<style scoped>
/* Container principal da página */
.register-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Div com a imagem de fundo com efeito de blur */
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('assets/img/login-background.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(2px); /* Ajuste o valor do blur conforme desejado */
  z-index: 0;
}

/* Container que centraliza o conteúdo da página */
.register-container {
  position: relative;
  z-index: 1; /* Garante que o conteúdo fique sobre a imagem de fundo */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

/* Estilo para o card de registro */
.register-card {
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
  color: #fff;
}
</style>
