package types

type ExchangeRateResponseApi struct {
	Result string `json:"result"`
	TimeLastUpdateUnix int64 `json:"time_last_update_unix"`
	TimeLastUpdateUtc string `json:"time_last_update_utc"`
	TimeNextUpdateUnix int64 `json:"time_next_update_unix"`
	TimeNextUpdateUtc string `json:"time_next_update_utc"`
	BaseCode string `json:"base_code"`
	ConversionRates map[string]float64 `json:"conversion_rates"`
}