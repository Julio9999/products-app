import { Link, LinkProps } from 'expo-router';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends LinkProps{}

const ThemedLink = ({style, ...rest}: Props) => {

    const primary = useThemeColor({}, 'primary');

  return (
    <Link 
        style={[
            {
                color: primary
            },
            style,
        ]}
        {...rest}
    />
  )
}

export default ThemedLink;