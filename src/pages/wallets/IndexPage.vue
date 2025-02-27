<template>
  <q-page padding class="q-pa-md">
    <div class="q-pa-md">
      <!-- Card com o resumo do número de carteiras -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Resumo de Carteiras</div>
          <div class="text-subtitle1">Você possui {{ wallets.length }} carteira(s).</div>
        </q-card-section>
      </q-card>

      <!-- Listagem das carteiras -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Carteiras</div>
          <q-list bordered separator>
            <q-item v-for="wallet in wallets" :key="wallet.walletId" clickable>
              <q-item-section>
                <div class="text-subtitle1">Carteira #{{ wallet.walletId }}</div>
                <div class="text-caption">Saldo: R$ {{ wallet.balance.toFixed(2) }}</div>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  icon="visibility"
                  color="primary"
                  @click="openViewDialog(wallet)"
                />
                <q-btn flat round icon="edit" color="primary" @click="openEditDialog(wallet)" />
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="openDeleteDialog(wallet)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Botão flutuante para adicionar nova carteira -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="orange" icon="add" @click="openAddDialog" />
    </q-page-sticky>

    <!-- Diálogo de visualização dos dados da carteira -->
    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes da Carteira</div>
        </q-card-section>
        <q-card-section>
          <div><strong>ID:</strong> {{ selectedWallet.walletId }}</div>
          <div><strong>Saldo:</strong> R$ {{ selectedWallet.balance.toFixed(2) }}</div>
          <div><strong>Criada em:</strong> {{ selectedWallet.createdAt }}</div>
          <div><strong>Atualizada em:</strong> {{ selectedWallet.updatedAt }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para adicionar/editar carteira -->
    <q-dialog v-model="dialog">
      <q-card style="width: 95%">
        <q-card-section>
          <div class="text-h6">
            {{ isEditing ? 'Editar Carteira' : 'Adicionar Carteira' }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveWallet">
            <q-input
              v-model.number="form.balance"
              label="Saldo"
              type="number"
              dense
              outlined
              required
              class="q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="saveWallet" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de confirmação para exclusão da carteira -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmar Exclusão</div>
          <div>Tem certeza que deseja excluir esta carteira?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="deleteWalletConfirmed" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Wallet {
  walletId: number
  balance: number
  userId: number
  createdAt: string
  updatedAt: string
}

const currentUserId = 1

// Mock dos dados de carteiras
const wallets = ref<Wallet[]>([
  {
    walletId: 1,
    balance: 1500.5,
    userId: currentUserId,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
  {
    walletId: 2,
    balance: 320.75,
    userId: currentUserId,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
])

const dialog = ref(false)
const deleteDialog = ref(false)
const viewDialog = ref(false)
const isEditing = ref(false)

// Formulário reativo para adicionar/editar carteira
const form = reactive({
  balance: 0,
})

// Carteira selecionada para visualização, edição ou exclusão
const selectedWallet = reactive<Wallet>({
  walletId: 0,
  balance: 0,
  userId: currentUserId,
  createdAt: '',
  updatedAt: '',
})

const openAddDialog = (): void => {
  isEditing.value = false
  form.balance = 0
  dialog.value = true
}

const openEditDialog = (wallet: Wallet): void => {
  isEditing.value = true
  form.balance = wallet.balance
  Object.assign(selectedWallet, wallet)
  dialog.value = true
}

const saveWallet = (): void => {
  if (form.balance === null || form.balance === undefined) return
  if (isEditing.value) {
    const index = wallets.value.findIndex((w) => w.walletId === selectedWallet.walletId)
    if (index !== -1) {
      wallets.value[index] = {
        walletId: wallets.value[index]?.walletId as number,
        userId: currentUserId,
        createdAt: wallets.value[index]?.createdAt as string,
        balance: form.balance,
        updatedAt: new Date().toLocaleString(),
      }
    }
  } else {
    const newWallet: Wallet = {
      walletId:
        wallets.value.length > 0 ? Math.max(...wallets.value.map((w) => w.walletId)) + 1 : 1,
      balance: form.balance,
      userId: currentUserId,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    }
    wallets.value.push(newWallet)
  }
  dialog.value = false
}

const openViewDialog = (wallet: Wallet): void => {
  Object.assign(selectedWallet, wallet)
  viewDialog.value = true
}

const openDeleteDialog = (wallet: Wallet): void => {
  Object.assign(selectedWallet, wallet)
  deleteDialog.value = true
}

const deleteWalletConfirmed = (): void => {
  wallets.value = wallets.value.filter((w) => w.walletId !== selectedWallet.walletId)
  deleteDialog.value = false
}
</script>

<style scoped>
.q-page {
  background-color: #1e1e1e;
  color: #1e1e1e;
}
.my-card {
  margin-bottom: 16px;
  padding: 16px;
}
</style>
