import { useTranslation } from 'react-i18next'
import type { GenderTypes, SpeciesTypes, StatusTypes } from '@/shared/types'

type CapitalizedOptions = {
  capitalize?: boolean
}

export const STATUS_OPTIONS: { label: string; value: StatusTypes }[] = [
  { label: 'alive', value: 'alive' },
  { label: 'dead', value: 'dead' },
  { label: 'unknown', value: 'unknown' }
]

export const SPECIES_OPTIONS: { label: string; value: SpeciesTypes }[] = [
  { label: 'human', value: 'human' },
  { label: 'alien', value: 'alien' },
  { label: 'humanoid', value: 'humanoid' },
  { label: 'animal', value: 'animal' },
  { label: 'robot', value: 'robot' },
  { label: 'cronenberg', value: 'cronenberg' },
  { label: 'mythology', value: 'mythology' },
  { label: 'disease', value: 'disease' },
  { label: 'unknown', value: 'unknown' }
]

export const GENDER_OPTIONS: { label: string; value: GenderTypes }[] = [
  { label: 'female', value: 'female' },
  { label: 'male', value: 'male' },
  { label: 'genderless', value: 'genderless' },
  { label: 'unknown', value: 'unknown' }
]

export const useStatuses = (options?: CapitalizedOptions) => {
  const capitalize = options?.capitalize ?? false
  const { t } = useTranslation('common')

  return STATUS_OPTIONS.map((option) => ({
    ...option,
    label: t(
      `status.${option.label}`,
      capitalize ? { postProcess: 'capitalizeFirst' } : undefined
    )
  }))
}

export const useSpecies = (options?: CapitalizedOptions) => {
  const capitalize = options?.capitalize ?? false
  const { t } = useTranslation('common')

  return SPECIES_OPTIONS.map((option) => ({
    ...option,
    label: t(
      `species.${option.label}`,
      capitalize ? { postProcess: 'capitalizeFirst' } : undefined
    )
  }))
}

export const useGenders = (options?: CapitalizedOptions) => {
  const capitalize = options?.capitalize ?? false
  const { t } = useTranslation('common')

  return GENDER_OPTIONS.map((option) => ({
    ...option,
    label: t(
      `gender.${option.label}`,
      capitalize ? { postProcess: 'capitalizeFirst' } : undefined
    )
  }))
}
