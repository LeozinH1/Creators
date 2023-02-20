import { Wrapper, TotalIcon } from './styles'
import Skeleton from '../../Skeleton'
import AnimatedNumber from 'animated-number-react'
import Formatter from '../../../utils/formatCurrency'

interface ComponentProps {
    value: number
    earningsLoading: boolean
}

const TotalEarnings: React.FC<ComponentProps> = ({
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
                        <TotalIcon />
                        <span>
                            <AnimatedNumber
                                value={value}
                                formatValue={formatValue}
                            />
                        </span>
                        <label>total retirado</label>
                    </>
                ) : (
                    <>
                        <TotalIcon />
                        <span>R$0,00</span>
                        <label>total retirado</label>
                    </>
                )}
            </Wrapper>
        </>
    )
}

export default TotalEarnings
