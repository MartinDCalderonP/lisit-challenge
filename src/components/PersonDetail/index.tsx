import { Person } from '../../types/api'
import { toMeters } from '../../utils'
import { motion } from 'framer-motion'

interface PersonDetailProps {
  person: Person
  handleSectionButtonClick: (url: string) => void
}

const PersonDetail = ({
  person,
  handleSectionButtonClick
}: PersonDetailProps) => {
  const motionButtonProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  }

  return (
    <>
      <section>
        <h2>Physical Characteristics</h2>
        <p>Height: {toMeters(Number(person.height))} m</p>
        <p>Mass: {person.mass}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
      </section>

      <section>
        <h2>Personal Information</h2>
        <p>Birth Year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
      </section>

      <section>
        <h2>Location</h2>
        <motion.button
          onClick={() => handleSectionButtonClick(person.homeworld)}
          {...motionButtonProps}
        >
          Home Planet
        </motion.button>
      </section>

      {person.starships.length > 0 && (
        <section>
          <h2>Starships</h2>
          {person.starships.map((starship, index) => (
            <motion.button
              key={starship}
              onClick={() => handleSectionButtonClick(starship)}
              {...motionButtonProps}
            >
              Starship #{index + 1}
            </motion.button>
          ))}
        </section>
      )}
    </>
  )
}

export default PersonDetail
