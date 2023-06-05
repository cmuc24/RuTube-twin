import { FC } from 'react'
import styles from './SubscribeButton.module.scss'

import { FaUserPlus } from 'react-icons/fa'

import { ISubscribeButton } from './SubscribeButton.interface'

import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useThrottiling } from '@/hooks/useThrottling'

export const SubscribeButton: FC<ISubscribeButton> = ({ user }) => {
	const { profile } = useAuth()
	const { updateSubscription, isLoading, isSubscribe } = useSubscription(
		Number(profile?.id),
		Number(user?.id)
	)

	const throttle = useThrottiling(updateSubscription, 300)

	return (
		<div
			onClick={throttle}
			className={`${styles.btnSubscribe} ${
				isSubscribe ? styles.subscribed : ''
			} ${isLoading ? styles.loading : ''} `}
			title={isSubscribe ? 'Отписаться' : 'Подписаться'}
		>
			<FaUserPlus />
			<span>
				{isLoading ? 'Загрузка' : isSubscribe ? 'Вы подписаны' : 'Подписаться'}
			</span>
		</div>
	)
}
