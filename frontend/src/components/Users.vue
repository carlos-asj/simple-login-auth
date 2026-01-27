<template>
  <v-container class="mt-4">
    <v-card class="pa-4 border-sm" elevation="0" rounded="lg">
      <div class="d-flex justify-space-between align-center mb-6">
        <div>
          <h1 class="text-h4 font-weight-bold">Usuários Cadastrados</h1>
          <p class="text-body-1 text-medium-emphasis mt-2">
            Total: {{ users.length }} usuário(s)
          </p>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-refresh"
          @click="fetchUsers"
          :loading="loading"
        >
          Recarregar
        </v-btn>
      </div>

      <!-- Tabela -->
      <v-card flat class="border-sm">
        <v-table>
          <thead>
            <tr>
              <th class="text-left font-weight-bold text-h6">ID</th>
              <th class="text-left font-weight-bold text-h6">Nome</th>
              <th class="text-left font-weight-bold text-h6">Email</th>
              <th class="text-left font-weight-bold text-h6">Cadastro</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name || 'Sem nome' }}</td>
              <td>{{ user.email || 'Sem email' }}</td>
              <td>
                {{ formatUserDate(user) }}
              </td>
            </tr>

            <tr v-if="users.length === 0 && !loading">
              <td colspan="4" class="text-center py-8">
                <v-icon size="64" color="grey" class="mb-2">mdi-database-remove</v-icon>
                <p class="text-h6">Nenhum usuário encontrado</p>
                <p class="text-body-2 text-grey mt-2">
                  Verifique se o backend está retornando dados
                </p>
              </td>
            </tr>
          </tbody>
        </v-table>

        <div v-if="loading" class="text-center py-8">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-2">Carregando usuários...</p>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const users = ref([]);
const loading = ref(false);

// Função para formatar a data do usuário
const formatUserDate = (user) => {
  // Tenta diferentes campos de data
  const dateValue = user.createdAt;

  if (!dateValue) return 'N/A';

  try {
    const date = new Date(dateValue);

    // Verifica se é uma data válida
    if (isNaN(date.getTime())) {
      if (dateValue.seconds) {
        const firebaseDate = new Date(dateValue.seconds * 1000);
        return firebaseDate.toLocaleDateString('pt-BR');
      }
      return String(dateValue);
    }

    // Formata a data no formato brasileiro
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return String(dateValue);
  }
};

// Função para buscar usuários
const fetchUsers = async () => {
  loading.value = true;

  try {
    const response = await api.get('/users');

    // Verifica se é um array direto
    if (Array.isArray(response.data)) {
      users.value = response.data;
      console.log(`Carregados ${users.value.length} usuários (array direto)`);
    }
    // Verifica se é um objeto
    else if (response.data && typeof response.data === 'object') {
      // Tenta encontrar um array dentro do objeto
      const data = response.data;

      const possibleKeys = ['users', 'data'];

      for (const key of possibleKeys) {
        if (response.data[key] && Array.isArray(response.data[key])) {
          users.value = response.data[key];
          console.log(`Carregados ${users.value.length} usuários (chave: ${key})`);
          break;
        }
      }

      // Se não encontrou em nenhuma chave conhecida, mostra erro
      if (users.value.length === 0) {
        console.error('Formato não reconhecido. Estrutura completa:');
        console.dir(response.data);

        // Tenta usar o objeto como array se tiver propriedades de usuário
        if (response.data.id && response.data.name) {
          users.value = [response.data]; // Pode ser um único usuário
          console.log('Carregado como único usuário');
        }
      }
    } else {
      console.error('Formato de resposta inesperado:', typeof response.data);
    }

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);

    // Dados de exemplo para desenvolvimento
    users.value = [
      {
        id: 1,
        name: 'João Silva (Exemplo)',
        email: 'joao@exemplo.com',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Maria Santos (Exemplo)',
        email: 'maria@exemplo.com',
        created_at: new Date('2024-01-15T10:30:00Z').toISOString()
      },
      {
        id: 3,
        name: 'Pedro Oliveira (Exemplo)',
        email: 'pedro@exemplo.com',
        created_at: new Date('2024-01-10T14:20:00Z').toISOString()
      }
    ];

    console.log('Usando dados de exemplo para desenvolvimento');

  } finally {
    loading.value = false;
  }
};

// Carrega os usuários quando a página é aberta
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.border-sm {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* Estilo para linhas da tabela */
.v-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
