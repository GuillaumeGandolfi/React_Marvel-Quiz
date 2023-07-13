import './loader.css';

export const Loader = ({ loadingMsg, styling}) => {

    return (
        <>
            <div className="loader"></div>
            <p style={ styling }>
                { loadingMsg }
            </p>
        </>
    )
}