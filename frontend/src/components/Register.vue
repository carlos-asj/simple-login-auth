<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="5">

        <v-card class="pa-8 elevation-0 border-sm",
        style="border-color: #a7a7a7 !important;
        border-style: solid;"
        rounded="xl">
          <div class="text-center">
            <h1 class="text-h5 font-weight-bold">Register</h1>
          </div>

          <v-card-text>
            <v-form ref="form" v-model="isFormValid">
              <div class="input-group mt-2">
                <v-text-field
                  v-model="userData.name"
                  label="name"
                  placeholder="your name"
                  persistent-placeholder
                  variant="outlined"
                  :rules="[rules.required]"
                  @keyup.enter="handleRegister"
                ></v-text-field>
              </div>

              <div class="input-group mt-2">
                <v-text-field
                  v-model="userData.email"
                  label="email"
                  placeholder="your email"
                  persistent-placeholder
                  variant-="outlined"
                  :rules="[rules.required, rules.email]"
                  variant="outlined"
                  @keyup.enter="handleRegister"
                ></v-text-field>
              </div>

              <div class="input-group mt-2">
                <v-text-field
                  v-model="userData.password"
                  label="password"
                  placeholder="your password"
                  persistent-placeholder
                  variant="outlined"
                  type="password"
                  :rules="[rules.required, rules.min]"
                  @keyup.enter="handleRegister"
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              size="large"
              rounded="xs"
              class="text-none bg-blue text-white"
              :loading="loading"
              @click="handleRegister"
            >
              Sign up
            </v-btn>
          </v-card-actions>

          <div class="text-center mt-8">
            <span class="text-body-2 text-medium-emphasis">Already have an account? </span>
            <router-link to="/login" class="login-link font-weight-bold">Sign in</router-link>
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
import { ref, reactive, watch } from 'vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const isFormValid = ref(false);
const loading = ref(false);
const form = ref(null);
const shouldValidate = ref(false);

const emailError = ref('');
const isEmailTaken = ref(false);

const userData = reactive({
  name: '',
  email: '',
  password: ''
});

const rules = {
  required: v => !!v || 'Required',
  email: v => /.+@.+\..+/.test(v) || 'Invalid email',
  min: v => v.length >= 6 || 'Too short',
};

watch(() => userData.email, (newEmail) => {
  if (newEmail && isEmailTaken.value) {
    isEmailTaken.value = false;
    emailError.value = '';
  }
});

const handleRegister = async () => {
  shouldValidate.value = true;

  await new Promise(resolve => setTimeout(resolve, 50));

  const { valid } = await form.value.validate();

  if (valid) {
    loading.value = true;
    try {
      await api.post('/register', userData);
      alert('Usuário cadastrado com sucesso!');

      userData.name = '';
      userData.email = '';
      userData.password = '';

      if (form.value) {
        form.value.reset();
        form.value.resetValidation();
      }

      isFormValid.value = false;
      emailError.value = '';
      isEmailTaken.value = false;
      shouldValidate.value = false;

      setTimeout(() => { router.push('/login'); }, 1500);

    } catch (error) {
      console.error('Erro:', error);
      let mensagemErro = error.response?.data?.message || 'Erro de conexão.';
      alert('Erro ao cadastrar: ' + mensagemErro);
      userData.name = '';
      userData.email = '';
      userData.password = '';
      shouldValidate.value = false;
    } finally {
      loading.value = false;
    }
  }
};
</script>
