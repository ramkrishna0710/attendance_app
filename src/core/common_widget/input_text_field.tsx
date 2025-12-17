import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    TextInput,
    TextInputProps,
    Text,
    View,
    StyleSheet,
    TextStyle,
    KeyboardTypeOptions,
    ReturnKeyType,
    TouchableOpacity,
} from 'react-native';
import Icon from './Icon';
import CustomText from './custom_text';
import { useTheme } from '../theme/ThemeContext';

export type FieldType = 'text' | 'email' | 'number' | 'password';
export type FieldAction = 'next' | 'search' | 'go' | 'done';

export interface InputTextFieldProps {
    controller?: { value: string; onChangeText: (value: string) => void }; // mimic TextEditingController
    initialText?: string;
    hintText?: string;
    fieldType?: FieldType;
    fieldAction?: FieldAction;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    bgColor?: string;
    borderColor?: string;
    textAlign?: 'left' | 'right' | 'center';
    readOnly?: boolean;
    onChanged?: (value: string) => void;
    validator?: (value: string) => string | undefined;
    borderRadius?: number;
    maxLength?: number;
    maxLines?: number;
    labelText?: string;
}

const InputTextField: FC<InputTextFieldProps> = ({
    controller,
    initialText,
    hintText = '',
    fieldType = 'text',
    fieldAction = 'done',
    prefixIcon,
    suffixIcon,
    textAlign = 'left',
    readOnly = false,
    borderRadius = 8,
    onChanged,
    maxLength,
    maxLines,
    bgColor,
    borderColor,
    labelText,
    validator,
}) => {
    const { colors } = useTheme();
    const isPassword = fieldType === 'password';
    const [obscureText, setObscureText] = useState(isPassword);
    const [internalValue, setInternalValue] = useState(initialText ?? '');
    const [error, setError] = useState<string | undefined>(undefined);

    const value = controller ? controller.value : internalValue;
    const setValue = controller ? controller.onChangeText : setInternalValue;

    useEffect(() => {
        if (!controller && initialText !== undefined) {
            setInternalValue(initialText);
        }
    }, [initialText, controller]);

    const keyboardType: KeyboardTypeOptions = useMemo(() => {
        switch (fieldType) {
            case 'email':
                return 'email-address';
            case 'number':
                return 'numeric';
            case 'password':
                return 'default';
            case 'text':
            default:
                return 'default';
        }
    }, [fieldType]);

    const returnKeyType: ReturnKeyType = useMemo(() => {
        switch (fieldAction) {
            case 'go':
                return 'go';
            case 'next':
                return 'next';
            case 'search':
                return 'search';
            case 'done':
            default:
                return 'done';
        }
    }, [fieldAction]);

    const handleChangeText = (text: string) => {
        setValue(text);
        onChanged?.(text);

        if (validator) {
            const validationResult = validator(text);
            setError(validationResult);
        } else {
            setError(undefined);
        }
    };

    const effectiveMaxLines = fieldType === 'password' ? 1 : maxLines ?? 1;

    return (
        <View style={styles.container}>
            {labelText ? (
                <>
                    <CustomText varient='h6' style={{ paddingBottom: 8 }}>{labelText}</CustomText>
                </>
            ) : null}

            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: bgColor ?? colors.background_light,
                        borderColor: error ? '#FF0000' : borderColor ?? '#000000',
                        borderRadius,
                    },
                ]}
            >
                {prefixIcon ? <View style={styles.prefix}>{prefixIcon}</View> : null}

                <TextInput
                    value={value}
                    onChangeText={handleChangeText}
                    placeholder={hintText}
                    secureTextEntry={isPassword ? obscureText : false}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    textAlign={textAlign}
                    editable={!readOnly}
                    maxLength={maxLength}
                    style={[styles.textInput, { color: '#000000' }]}
                    multiline={effectiveMaxLines > 1}
                    numberOfLines={effectiveMaxLines}
                    placeholderTextColor="#888888"
                />

                {isPassword ? (
                    <TouchableOpacity
                        style={styles.suffix}
                        onPress={() => setObscureText(prev => !prev)}
                        activeOpacity={0.7}
                    >
                        <Icon
                            iconFamily="MaterialIcons"
                            name={obscureText ? 'visibility-off' : 'visibility'}
                            size={20}
                            color="#888888"
                        />
                    </TouchableOpacity>
                ) : suffixIcon ? (
                    <View style={styles.suffix}>{suffixIcon}</View>
                ) : null}

            </View>

            {maxLength !== undefined ? (
                <View style={styles.counterRow}>
                    <Text style={styles.counterText}>
                        {value.length}/{maxLength}
                    </Text>
                </View>
            ) : null}

            {error ? <CustomText style={styles.errorText}>{error}</CustomText> : null}
        </View>
    );
};

export default InputTextField;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    prefix: {
        marginRight: 8,
    },
    suffix: {
        marginLeft: 8,
    },
    suffixToggle: {
        marginLeft: 8,
        color: '#888888',
        fontSize: 14,
    },
    counterRow: {
        marginTop: 4,
        alignItems: 'flex-end',
    },
    counterText: {
        color: '#000000',
        fontSize: 16,
    },
    errorText: {
        marginTop: 4,
        color: '#FF0000',
        fontSize: 13,
    },
});
