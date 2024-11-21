import { Planet } from '../../../types/api'
import { motion } from 'framer-motion'

interface PlanetDetailProps {
  planet: Planet
  handleSectionButtonClick: (url: string) => void
}

const PlanetDetail = ({
  planet,
  handleSectionButtonClick
}: PlanetDetailProps) => {
  const motionButtonProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  }

  return (
    <>
      <section>
        <h2>Physical Characteristics</h2>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Diameter: {planet.diameter}</p>
      </section>

      <section>
        <h2>Orbital Information</h2>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Population: {Number(planet.population).toLocaleString('es-ES')}</p>
      </section>

      {planet.residents.length > 0 && (
        <section>
          <h2>Residents</h2>
          {planet.residents.map((resident, index) => (
            <motion.button
              key={resident}
              onClick={() => handleSectionButtonClick(resident)}
              {...motionButtonProps}
            >
              Resident #{index + 1}
            </motion.button>
          ))}
        </section>
      )}
    </>
  )
}

export default PlanetDetail
