<template>
  <v-container fluid class="fill-height modern-bg">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">

        <v-card class="glass-card pa-8" elevation="0">
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold tracking-tight text-gradient">Registrar</h1>
          </div>

          <v-card-text class="pa-0">
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <div class="input-group">
                <label class="custom-label">Nome</label>
                <v-text-field
                  v-model="userData.name"
                  placeholder="Nome"
                  prepend-inner-icon="mdi-account-outline"
                  :rules="[rules.required]"
                  variant="outlined"
                  class="modern-input"
                  rounded="lg"
                ></v-text-field>
              </div>

              <div class="input-group mt-2">
                <label class="custom-label">Email</label>
                <v-text-field
                  v-model="userData.email"
                  placeholder="Email"
                  prepend-inner-icon="mdi-email-outline"
                  :rules="[rules.required, rules.email]"
                  variant="outlined"
                  class="modern-input"
                  rounded="lg"
                ></v-text-field>
              </div>

              <div class="input-group mt-2">
                <label class="custom-label">Senha</label>
                <v-text-field
                  v-model="userData.password"
                  placeholder="Senha"
                  prepend-inner-icon="mdi-lock-outline"
                  type="password"
                  :rules="[rules.required, rules.min]"
                  variant="outlined"
                  class="modern-input"
                  rounded="lg"
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>

          <v-card-actions class="pa-0 mt-6">
            <v-btn
              block
              color="white"
              size="x-large"
              class="register-btn"
              elevation="4"
              :loading="loading"
              :disabled="!isFormValid"
              @click="handleRegister"
            >
              Cadastrar
            </v-btn>
          </v-card-actions>

          <div class="text-center mt-8">
            <span class="text-body-2 text-medium-emphasis">Já possui uma conta? </span>
            <router-link to="/login" class="login-link font-weight-bold">Entrar</router-link>
          </div>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Fundo Dinâmico */
.modern-bg {
  background: #e3e3e3
}

/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

/* Título com Gradiente */
.text-gradient {
  background: #000000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Customização dos Inputs */
.custom-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #000000;
}

.modern-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
}

.modern-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1;
  color: #0033b4 !important;
}

/* Botão Moderno */
.register-btn {
  border-radius: 6px !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  background: #0033b4 !important;
}

/* Links */
.login-link {
  color: #0033b4;
  text-decoration: none;
  transition: opacity 0.2s;
}

.login-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>

<script setup>
import { ref, reactive } from 'vue';
import api from '@/services/api';

const isFormValid = ref(false);
const loading = ref(false);
const form = ref(null);

const userData = reactive({
  name: '',
  email: '',
  password: ''
});

const rules = {
  required: v => !!v || 'Campo obrigatório',
  email: v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
  min: v => v.length >= 6 || 'Mínimo de 6 caracteres',
};

const handleRegister = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    loading.value = true;
    try {
      await api.post('/register', userData);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      let mensagemErro = error.response?.data?.message || 'Erro de conexão.';
      alert('Erro ao cadastrar: ' + mensagemErro);
    } finally {
      loading.value = false;
    }
  }
};
</script>
