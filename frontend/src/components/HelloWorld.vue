<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pa-4">
          <v-card-title class="text-h5 text-center">Criar Conta</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-text-field
                v-model="userData.name"
                label="Usuário"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                required
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="userData.email"
                label="E-mail"
                prepend-inner-icon="mdi-email"
                :rules="[rules.required, rules.email]"
                required
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="userData.password"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                type="password"
                :rules="[rules.required, rules.min]"
                required
                variant="outlined"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              color="primary"
              size="large"
              :loading="loading"
              :disabled="!isFormValid"
              @click="handleRegister"
            >
              Registrar
            </v-btn>
          </v-card-actions>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <span>Já tem uma conta? </span>
            <router-link to="/login" class="text-decoration-none text-primary">Entrar</router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';

const isFormValid = ref(false);
const loading = ref(false);
const form = ref(null);

const userData = reactive({
  name: '',
  email: '',
  password: ''
});

// Regras de validação (Boas práticas)
const rules = {
  required: v => !!v || 'Campo obrigatório',
  email: v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
  min: v => v.length >= 6 || 'Mínimo de 6 caracteres',
};

import api from '@/services/api';

const handleRegister = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);

  if (valid) {
    loading.value = true;
    try {
      const response = await api.post('/register', userData);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      // LOG COMPLETO NO CONSOLE PARA VOCÊ INVESTIGAR
      console.error('Detalhes do erro:', error);

      // Tratamento amigável para o usuário
      let mensagemErro = 'Erro de conexão com o servidor.';

      if (error.response && error.response.data) {
        // O servidor respondeu (Ex: 400 Bad Request)
        mensagemErro = error.response.data.message || 'Erro nos dados enviados.';
      } else if (error.request) {
        // O servidor não respondeu (Ex: Servidor Offline)
        mensagemErro = 'Não foi possível contatar o servidor. Verifique se o backend está rodando.';
      }

      alert('Erro ao cadastrar: ' + mensagemErro);
    } finally {
      loading.value = false;
    }
  }
};
</script>
