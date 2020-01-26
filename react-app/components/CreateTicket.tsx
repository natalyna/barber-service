import { Col, Row, Steps, Typography } from 'antd'
import { FC, ReactElement, useState } from 'react'

import Holiday from '../models/Holiday'
import Service from '../models/Service'
import { ServiceList } from './ServiceList'
import User from '../models/User'
import { useCreateTicket } from '../hooks/useCreateTicket'

const { Text } = Typography

interface Props {
	services: Service[]
	client: User
	master: User
	holidays: Holiday[]
	nonWorkDays: number[]
}

interface Step {
	title: string
	content: ReactElement
}

export const CreateTicket: FC<Props> = ({ services }) => {
	const { duration, cost, getServiceTime, getServiceCost } = useCreateTicket()

	const steps: Step[] = [
		{
			title: 'Услуги',
			content: (
				<ServiceList services={services} getServiceTime={getServiceTime} getServiceCost={getServiceCost} />
			),
		},
		{
			title: 'Дата',
			content: <div />,
		},
	]

	return (
		<>
			<Steps current={0}>
				{steps.map(item => (
					<Steps.Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[0].content}</div>
			<div>
				<Row>
					<Col span={12}>
						<Text strong>Продолжительность</Text>
					</Col>
					<Col span={12}>
						<span data-testid="ticket-duration">{duration}</span>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Text strong>Стоимость</Text>
					</Col>
					<Col span={12}>
						<span data-testid="ticket-cost">{cost}</span>
					</Col>
				</Row>
			</div>
		</>
	)
}
