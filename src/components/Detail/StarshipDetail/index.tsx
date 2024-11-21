import { Starship } from '../../../types/api'
import { motion } from 'framer-motion'

interface StarshipDetailsProps {
  starship: Starship
  handleSectionButtonClick: (url: string) => void
}

const StarshipDetails = ({
  starship,
  handleSectionButtonClick
}: StarshipDetailsProps) => {
  const motionButtonProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  }

  return (
    <>
      <section>
        <h2>General Information</h2>
        <p>Model: {starship.model}</p>
        <p>Manufacturer: {starship.manufacturer}</p>
        <p>Class: {starship.starship_class}</p>
        <p>Cost: {starship.cost_in_credits}</p>
      </section>

      <section>
        <h2>Specifications</h2>
        <p>Length: {starship.length}</p>
        <p>Crew: {starship.crew}</p>
        <p>Max Speed: {starship.max_atmosphering_speed}</p>
        <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
      </section>

      {starship.pilots.length > 0 && (
        <section>
          <h2>Pilots</h2>
          {starship.pilots.map((pilot, index) => (
            <motion.button
              key={pilot}
              onClick={() => handleSectionButtonClick(pilot)}
              {...motionButtonProps}
            >
              Pilot #{index + 1}
            </motion.button>
          ))}
        </section>
      )}
    </>
  )
}

export default StarshipDetails
