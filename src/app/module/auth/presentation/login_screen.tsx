import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../../core/theme/ThemeContext';
import Icon from '../../../../core/common_widget/Icon';
import InputTextField from '../../../../core/common_widget/input_text_field';
import AppHelper from '../../../../core/utils/AppHelper';
import CachedImage from '../../../../core/common_widget/cache_image';
import CustomSafeAreaView from '../../../../core/common_widget/custom_safe_area_view';
import { heightBox } from '../../../../core/utils/size';
import Spacer from '../../../../core/common_widget/spacer';

const LoginScreen = () => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <CustomSafeAreaView style={styles.container}>
            <InputTextField
                prefixIcon={
                    <Icon
                        iconFamily="MaterialIcons"
                        name="person-outline"
                        size={22}
                        color={colors.text}
                    />
                }
                onChanged={value => {
                    setEmail(value);
                }}
                validator={value => {
                    if (!value || value.trim().length === 0) {
                        return 'Email is required';
                    }
                    if (!AppHelper.isValidEmail(value)) {
                        return 'Please type a valid format email!';
                    }
                }}
                maxLines={1}
                fieldType="email"
                fieldAction="next"
                hintText='Enter your email'
                labelText='Email'
            />

            <Spacer h={16} />

            <InputTextField
                prefixIcon={
                    <Icon
                        iconFamily="MaterialIcons"
                        name="lock-outline"
                        color={colors.text}
                        size={22}
                    />
                }
                fieldType="password"
                onChanged={value => {
                    setPassword(value);
                }}
                validator={value => {
                    if (!value || value.trim().length === 0) {
                        return 'Password is required';
                    }

                    const err = AppHelper.passwordError(value);
                    if (err != null) {
                        return 'Please type a valid password!';
                    }
                }}
                maxLines={1}
                labelText='Password'
                hintText='Enter your password'
            />

        </CustomSafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});