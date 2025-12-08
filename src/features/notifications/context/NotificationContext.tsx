import { useAuth } from "@/features/auth/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import { Platform } from "react-native";
import { useRegisterTokenService } from "../services/useRegisterTokenService";
import { NotificationData, processNotification } from "../utils/notificationHandlers";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

interface NotificationContextType {
    expoPushToken: string;
    notification?: Notifications.Notification;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
    const responseListener = useRef<Notifications.Subscription | undefined>(undefined);
    const { isAuthenticated } = useAuth();
    const { mutate: registerToken } = useRegisterTokenService();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isAuthenticated) {
            registerForPushNotificationsAsync().then((token) => {
                console.log("Token: ", token);
                const tokenString = token ?? "";
                setExpoPushToken(tokenString);
                if (tokenString) {
                    registerToken({ token: tokenString });
                }
            });
        }
    }, [isAuthenticated, registerToken]);

    const handleNotificationEvent = (notification: Notifications.Notification) => {
        const data = notification.request.content.data as NotificationData;
        processNotification(queryClient, data);
    };

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
                handleNotificationEvent(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const notification = response.notification;
                setNotification(notification);
                handleNotificationEvent(notification);
            }
        );

        return () => {
            if (notificationListener.current) {
                notificationListener.current.remove();
            }
            if (responseListener.current) {
                responseListener.current.remove();
            }
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            token = pushTokenString;
        } catch (e: unknown) {

        }
    } else {
    }

    return token;
}
