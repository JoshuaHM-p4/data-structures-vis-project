const History = ({ history }) => {
    const getImagePath = (type, color, isUtility) => {
        if (isUtility) {
          return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
        } else {
          return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
        }
      };
    
    return (        
    <div className='absolute top-0 left-0 min-w-80 pt-3 rounded-e-lg h-full bg-black bg-opacity-70 z-10'>
        <div className='flex flex-col gap-2 p-2 h-full pt-12 lg:pt-0'>
          <h1 className='hidden lg:block text-white text-lg text-center my-2'>History</h1>
          <div className='overflow-y-auto h-full '>
            {history.map((car, index) => (
              <div key={index} className='flex flex-col md:flex-row justify-center md:justify-start m-1 items-center rounded-lg border bg-black bg-opacity-60 text-white relative'>
                <img src={getImagePath(car?.type, car?.color, car?.isUtility)} alt={car?.type} className='w-20 h-20 mx-2' />
                <div className='flex flex-col gap-1 p-1 text-center md:text-start'>
                    <p>Plate #: {car.plateNumber}</p>
                    <p>{!car.isUtility ? car.color + ' ' : ''}{car.type}</p>
                    <p>Arrival: {car.arrivalCount} </p>
                    <p>Departure: {car.departureCount}</p>
                  </div>
              </div>

            ))}


          </div>
        </div>
      </div>
    );
}
export default History;