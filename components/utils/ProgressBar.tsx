const ProgressBar = ({ completed }: any) => {
    return (
        <div className='h-1 w-full bg-gray-300'>
            <div
                style={{ width: `${completed}%`}}
                className={`h-full ${
                    completed < 70 ? 'bg-orange-600' : 'bg-green-600'}`}>
            </div>
        </div>
    );
};

export default ProgressBar