import { Link } from 'react-router-dom';

const HomepageItem = ({ item }) => {
  return (
    <Link className="bg-slate-500 md:h-40 md:w-40 h-60 w-60 rounded shadow flex items-center justify-center text-center hover:shadow hover:translate-y-2 transition-all "
      to={item?.Link}>
      {item?.title}
    </Link>
  )
}

export default HomepageItem;
