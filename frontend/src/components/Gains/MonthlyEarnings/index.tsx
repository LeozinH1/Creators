import { Wrapper, MonthlyIcon } from './styles'
import Skeleton from '../../Skeleton'
import AnimatedNumber from 'animated-number-react'
import Formatter from '../../../utils/formatCurrency'

interface ComponentProps {
    value: number
    earningsLoading: boolean
}

const MonthlyEarnings: React.FC<ComponentProps> = ({
    value,
    earningsLoading,
}) => {
    const formatValue = (value: number) => Formatter(value)

    return (
        <>
            <Wrapper>
                {earningsLoading ? (
                    <Skeleton width={300} height={50} />
                ) : value ? (
                    <>
                        <MonthlyIcon />
                        <span>
                            <AnimatedNumber
                                value={value}
                                formatValue={formatValue}
                            />
                        </span>
                        <label>para retirar</label>
                    </>
                ) : (
                    <>
                        <MonthlyIcon />
                        <span>R$0,00</span>
                        <label>para retirar</label>
                    </>
                )}
            </Wrapper>
        </>
    )
}

export default MonthlyEarnings
