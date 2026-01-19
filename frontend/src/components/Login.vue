<template>
  <v-container class="fill-height justify-center">
    <v-card
    width="400"
    class="pa-6 elevation-0 border-sm",
    style="border-color: #a7a7a7 !important; border-style: solid;"
    rounded="xl">

      <v-card-item class="text-center">
        <v-avatar v-if="step === 'senha'" color="primary" size="64" class="mb-4">
          <span class="text-h5 text-white">{{ userData.name.charAt(0) }}</span>
        </v-avatar>
        <v-card-title class="text-h5 font-weight-bold">
          {{ step === 'identification' ? 'Login' : '' }}
        </v-card-title>
        <v-card-subtitle v-if="step === 'senha'" class="text-body-1 mt-1 text-black">
          {{ userData.name }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-form ref="form" v-model="isValid" validate-on="submit" @submit.prevent="handleSubmit">

          <v-window v-model="step">
            <v-window-item value="identification">
              <p class="mb-4"></p>
              <v-text-field
                v-model="userData.email"
                label="email"
                placeholder="your email"
                persistent-placeholder
                variant="outlined"
                :rules="[rules.required, rules.email]"
                @keyup.enter="checkEmail"
              ></v-text-field>
            </v-window-item>

            <v-window-item value="senha">
              <div class="text-center">
                <div class="d-inline-flex align-center mb-6 email-chip" @click="voltarParaEmail">
                  <v-icon size="small" class="mr-2">mdi-account-circle-outline</v-icon>

                  <span class="text-body-2">{{ userData.email }}</span>

                  <v-icon size="small" class="ml-2">mdi-chevron-down</v-icon>
                </div>
              </div>

              <v-text-field
                ref="passwordInput"
                v-model="userData.password"
                label="password"
                placeholder="your password"
                persistent-placeholder
                type="password"
                variant="outlined"
                :rules="step === 'senha' ? [rules.required] : []"
                :error-messages="passwordError"
                @update:model-value="passwordError = ''"
                @keyup.enter="handleLogin"
              ></v-text-field>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse justify-space-between ga-3 px-6 pb-6">
        <v-btn
          size="large"
          rounded="xs"
          class="text-none bg-blue text-white"
          :loading="loading"
          @click.stop="step === 'identification' ? checkEmail() : handleLogin()"
        >
          {{ step === 'identification' ? 'Next' : 'Next' }}
        </v-btn>

        <v-btn variant="text" size="large" rounded="xs" class="text-none" v-if="step === 'identification'" @click="goRegister">
          Sign up
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const voltarParaEmail = async () => {
  loading.value = false;
  step.value = 'identification';
  userData.password = '';
  passwordError.value = '';

  await nextTick();

  if (form.value) {
    // 1. Limpa tudo
    await form.value.resetValidation();
    // 2. Pequeno truque: forçamos o isValid a true para garantir que o
    // botão não seja bloqueado por estados fantasmas do Vuetify
    isValid.value = true;
  }
};

const goRegister = () => {
  router.push('/register');
}

const step = ref('identification'); // Controle de estado: 'identification' ou 'senha'
const isValid = ref(false);
const loading = ref(false);
const form = ref(null);

const handleSubmit = () => {
  if (step.value === 'identification') {
    checkEmail();
  } else {
    handleLogin();
  }
};

const userData = reactive({
  name: '',
  email: '',
  password: ''
});

const rules = {
  required: v => !!v || 'Required',
  email: v => /.+@.+\..+/.test(v) || 'Invalid email'
};

const passwordInput = ref(null);

// Função para validar o e-mail no Backend
const checkEmail = async () => {

  if (!form.value) return;

  // Forçamos a validação manual
  const { valid } = await form.value.validate();

  if (!valid) return;

  loading.value = true;
  try {
    const response = await api.post('/check-email', { email: userData.email });
    if (response.data && response.data.user) {
      userData.name = response.data.user.name;
      step.value = 'senha';
      setTimeout(() => {
        passwordInput.value?.focus();
      }, 300);
    }
  } catch (error) {
    console.error("Erro na API:", error);
    alert('User not found.');
  } finally {
    loading.value = false;
  }
};

const passwordError = ref('');

const handleLogin = async () => {
  loading.value = true;
  passwordError.value = '';

  try {
    const response = await api.post('/login', {
      email: userData.email,
      password: userData.password
    });

    alert('Login executado com sucesso');

  } catch (error) {
    console.error('Erro no login:', error);

    if (error.response.status === 401) {
      passwordError.value = 'Wrong password. Try again';
    }

  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.email-chip {
  border: 1px solid #e0e0e0;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
  max-width: 100%;
}
.email-chip:hover {
  background: #f5f5f5;
}

:deep(.v-messages__message) {
  color: #ff0000; /* Cor do erro */
  font-size: 12px;
  font-weight: 500;
  transition: none !important; /* Remove a animação de 'fade' do texto */
}

:deep(.v-input__details) {
  transition: none !important;
  padding-top: 4px;
}
</style>
