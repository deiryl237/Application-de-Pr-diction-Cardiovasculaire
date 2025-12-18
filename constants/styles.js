import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#FAFAF6',
  primary: '#2FAE78',
  accent: '#246EE9',
  warn: '#FBD45A',
  danger: '#EF4444',
  cardBg: '#FFFFFF',
  muted: '#666666',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  pagePadding: {
    padding: 24,
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: 16,
    borderRadius: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 999,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  smallMuted: {
    color: colors.muted,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
});
