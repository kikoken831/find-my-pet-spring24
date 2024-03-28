import { useAppSelector } from '../../common'
import styles from './Loader.module.css'
const Loader = () => {
  const { isLoading } = useAppSelector((state) => state.loader)

  return <>{isLoading && <div className={styles.loader}></div>}</>
}

export default Loader
