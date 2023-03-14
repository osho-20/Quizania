import Particles from 'react-tsparticles'
import particleConfig from './config/particles-config'
const background = () => {
    return (
        <div>
            <Particles params={particleConfig}>
            </Particles>
        </div>
    )
}

export default background
