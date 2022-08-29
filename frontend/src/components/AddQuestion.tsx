import gsap from 'gsap'

const AddQuestion = () => {

    const handleCloseModal = () => {

        gsap.to('#modalAddQuestion', {display: 'hidden', opacity: 0})

    }

    return (
        <div className='hidden w-screen h-screen fixed top-0 left-0 z-20 place-content-center' id='modalAddQuestion'>
            <div className='relative w-96 h-72 bg-amber-300'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                     stroke="currentColor" className='w-6 h-6 text-red-500 absolute top-0 right-0' onClick={handleCloseModal}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/>
                </svg>

                <h2>Dodaj pytanie</h2>

                <form>
                    <input/>
                </form>
            </div>
        </div>
    )

}

export default AddQuestion