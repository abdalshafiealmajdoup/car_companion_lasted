// src/components/CarTypesComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarTypes, selectAllCarTypes, getCarTypesStatus, getCarTypesError } from '../store/slices/carTypesSlice';
import { RootState } from '../store';

const CarTypesComponent: React.FC = () => {
    const dispatch = useDispatch();
    const carTypes = useSelector(selectAllCarTypes);
    const status = useSelector(getCarTypesStatus);
    const error = useSelector(getCarTypesError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCarTypes());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading car types...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {carTypes.map(carType => (
                <li key={carType.id}>{carType.name}</li>
            ))}
        </ul>
    );
}

export default CarTypesComponent;
