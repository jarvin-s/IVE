import QuizSummary from '@/components/Quiz/QuizSummary'

const QuizSummaryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return <QuizSummary id={id} />
}

export default QuizSummaryPage
