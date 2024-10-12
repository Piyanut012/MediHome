import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Button style={{ backgroundColor: '#11942D', borderColor: '#E0FFD9' }} disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ml-2">Loading...</span>
            </Button>
        </div>
    )
}

export default Loading;
