import NetInfo from '@react-native-community/netinfo';
import { Linking } from 'react-native';
import { format } from 'date-fns';
import type { AxiosRequestConfig } from 'axios';
import Geocoder from 'react-native-geocoding';


export default class AppHelper {

    static async checkInternetConnection(): Promise<boolean> {
        const state = await NetInfo.fetch();
        return !!state.isConnected;
    }


    static isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    }

    static formatTimeToAMPM(time: string): string {
        // expects "HH:mm:ss"
        const [hours, minutes, seconds] = time.split(':').map(part => parseInt(part, 10));
        const date = new Date();
        date.setHours(hours, minutes, seconds || 0, 0);
        return format(date, 'hh:mm a');
    }

    static formatHourValue(value: number): string {
        if (value <= 0) return '0m';

        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);

        if (hours === 0) {
            return `${minutes}m`;
        }

        return `${hours}h`;
    }

    static isSameDay(a: Date, b: Date): boolean {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    static calculateWorkingHours(checkin: string, checkout: string): number {
        const [ciH, ciM, ciS] = checkin.split(':').map(v => parseInt(v, 10));
        const [coH, coM, coS] = checkout.split(':').map(v => parseInt(v, 10));

        const base = new Date(0, 0, 0);
        const checkinTime = new Date(base);
        checkinTime.setHours(ciH, ciM, ciS || 0, 0);

        const checkoutTime = new Date(base);
        checkoutTime.setHours(coH, coM, coS || 0, 0);

        const durationMs = checkoutTime.getTime() - checkinTime.getTime();
        const minutes = durationMs / (1000 * 60);
        return minutes / 60; // hours as double
    }

    static passwordError(password: string): string | null {
        if (!password || password.length === 0) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[A-Za-z]/.test(password)) {
            return 'Password must contain at least one letter';
        }
        if (!/\d/.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!/[@$!%*?&]/.test(password)) {
            return 'Password must contain at least one special character (@, $, !, %, *, ?, &)';
        }
        return null;
    }

    static otpError(otp: string): string | null {
        if (!otp || otp.length === 0) {
            return 'OTP is required';
        }
        if (otp.length !== 5) {
            return 'OTP must be exactly 5 digits';
        }
        if (!/^\d+$/.test(otp)) {
            return 'OTP must contain only numbers';
        }
        return null;
    }

    static async getAddressFromLatLng(params: {
        latitude: number;
        longitude: number;
    }): Promise<{
        formattedAddress: string;
        city?: string;
        country?: string;
        [key: string]: any;
    }> {
        const { latitude, longitude } = params;

        const response = await Geocoder.from(latitude, longitude);
        if (response.results && response.results.length > 0) {
            const result = response.results[0];
            const formattedAddress = result.formatted_address;
            const components = result.address_components || [];

            const cityComponent = components.find((c: any) =>
                c.types.includes('locality'),
            );
            const countryComponent = components.find((c: any) =>
                c.types.includes('country'),
            );

            return {
                formattedAddress,
                city: cityComponent?.long_name,
                country: countryComponent?.long_name,
                raw: result,
            };
        }

        throw new Error('No address found');
    }

    static generateCacheKey(options: AxiosRequestConfig): string {
        const uri = options.url || '';
        const method = options.method || 'GET';
        const data =
            options.data !== undefined ? JSON.stringify(options.data) : '';

        return `${method}:${uri}:${data}`;
    }

    static safeCastToMap(value: any): Record<string, any> {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            try {
                return { ...value } as Record<string, any>;
            } catch {
                return {};
            }
        }
        return {};
    }

    // -------- Bottom sheet dialog analog (simplified) --------
    // In React Native, use a modal / bottom-sheet library instead.
    // This is a helper to centralize API similar to your Flutter version.
    //
    // Example usage with @gorhom/bottom-sheet or @react-native-modal
    // is usually more idiomatic, but signature is kept similar.

    // Placeholder type to show intent:
    // static showBottomSheetDialog(...) { /* integrate chosen library */ }

    // -------- Custom dialog analog (blurred background) --------
    // Same note as above: use a modal library; this is just a pattern.
    // Example signature:
    //
    // static showCustomDialog(...) { /* integrate chosen library */ }


    static async openUrl(url: string): Promise<void> {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            throw new Error(`Could not launch ${url}`);
        }
    }
}
