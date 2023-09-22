import { Props } from '@/types/interfaces'

interface SettingsBoxProps extends Props {
  imageWidth: number
  imageHeight: number
  isRatio: boolean
  isQuality: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckboxChange: any
}

export default function SettingsBox({
  styles,
  imageWidth,
  imageHeight,
  handleInputChange,
  isRatio,
  isQuality,
  handleCheckboxChange,
}: SettingsBoxProps) {
  return (
    <div className={styles.settingsBox}>
      <div className={`${styles.row} ${styles.sizes}`}>
        <div className={`${styles.column} ${styles.width}`}>
          <label>Длина</label>
          <input
            type="number"
            name="width"
            value={imageWidth}
            onChange={handleInputChange}
          />
        </div>
        <div className={`${styles.column} ${styles.height}`}>
          <label>Высота</label>
          <input
            type="number"
            name="height"
            value={imageHeight}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={`${styles.row} ${styles.checkboxes}`}>
        <div className={`${styles.column} ${styles.ratio}`}>
          <label>
            <input
              type="checkbox"
              name="ratio"
              checked={isRatio}
              onChange={handleCheckboxChange}
            />
            Сохранить пропорции
          </label>
        </div>
        <div className={`${styles.column} ${styles.quality}`}>
          <label>
            <input
              type="checkbox"
              name="quality"
              checked={isQuality}
              onChange={handleCheckboxChange}
            />
            Сжать на 30%
          </label>
        </div>
      </div>
    </div>
  )
}
