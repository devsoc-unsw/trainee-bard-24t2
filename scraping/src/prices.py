import json
import subprocess
import sys
try:
    import pandas as pd
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pandas"])
    import pandas as pd

def getSeasonality(data, threshold):
    df = pd.json_normalize(data, record_path='price_history', meta='name', sep='_')

    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace = True)

    price_stats = df.groupby('name')['price'].describe(percentiles=[threshold])
    threshold_val = price_stats[f'{threshold}%'[2:]].values[0]

    df_resampled = df['price'].resample('ME').mean()
    df_filled = df['price'].resample("ME").last().ffill()
    fruit_data = df_resampled.combine_first(df_filled)

    monthly_low = fruit_data[fruit_data < threshold_val]
    months = [date.strftime('%B') for date in monthly_low.index]

    print(f"threshold: {threshold_val}, months: {months}")

    # TODO When 2 years worth of data

    # try:
    #     from statsmodels.tsa.seasonal import seasonal_decompose
    # except ImportError:
    #     subprocess.check_call([sys.executable, "-m", "pip", "install", "statsmodels"])
    #     from statsmodels.tsa.seasonal import seasonal_decompose
    
    # result = seasonal_decompose(fruit_data, model="additive", period=12)

    # seasonal_component = result.seasonal

    # low_threshold = np.percentile(seasonal_component, 10)
    # low_points = seasonal_component[seasonal_component <= low_threshold]

    # print("Seasonal Low Points:")
    # print(low_points)

if __name__ == "__main__":
    # with open('./price_assets/test_data.json') as file:
    #     data = json.load(file)
    json_data = sys.argv[1]
    data = json.loads(json_data)
    getSeasonality(data, .25)