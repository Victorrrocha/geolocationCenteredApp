import styled from 'styled-components';
import {Button as Btn} from 'react-native';

const Button = styled(Btn)`
  background-color: ${props => props.theme.color.primary};
`;

export default Button;
