import { LinearGradient } from 'expo-linear-gradient';

export default function Gradient({ children, colors = ['#2FAE78', '#246EE9'], style }) {
  return (
    <LinearGradient colors={colors} style={[{ padding: 16 }, style]}>
      {children}
    </LinearGradient>
  );
}
