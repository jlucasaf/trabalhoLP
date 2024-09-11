import { StyleSheet } from 'react-native';
import { tema } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  tituloContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 32,
    color: tema.cores.rosa[500],
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: tema.cores.rosa[500],
    marginBottom: 10,
    marginTop: 20,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: tema.cores.cinza[300],
  },
  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemEndereco: {
    fontSize: 16,
  },
  itemVoluntario: {
    fontSize: 14,
    color: tema.cores.cinza[500],
  },
  itemCampanhaEndereco: {
    fontSize: 14,
    color: tema.cores.cinza[500],
  },
  itemDescricao: {
    fontSize: 14,
    color: tema.cores.cinza[500],
    marginTop: 5,
  },
  itemData: {
    fontSize: 14,
    fontStyle: 'italic',
    color: tema.cores.cinza[500],
    marginTop: 5,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: tema.cores.cinza[500],
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 18,
    marginVertical: 4,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 20,
  },
  itemImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  qrCodeImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  modalCloseButton: {
    marginTop: 20,
  },
  botaoContainer: {
    marginTop: 20,
  },
});

