import { SplashScreen } from 'expo-router';
import { useSession } from '../context/authContext';
import { initDatabase } from '../data/sqlite';

SplashScreen.preventAutoHideAsync();

initDatabase();

export function SplashScreenController() {
    const { isLoading } = useSession();

    if (!isLoading) {
        SplashScreen.hide();
    }

    return null;
}
