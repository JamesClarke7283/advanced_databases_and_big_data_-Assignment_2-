import pandas as pd

# Load the Excel file
file_path = "./data/Movies Data.xlsx"
xl = pd.ExcelFile(file_path)

# Load the Role table and Movies table into DataFrames
roles_df = xl.parse(sheet_name='Role Table', skiprows=7, usecols='E:G', nrows=200)
movies_df = xl.parse(sheet_name='Movie Table', skiprows=4, usecols='B:H', nrows=19)

# Rename columns for clarity
roles_df.columns = ['movieId', 'actorId', 'roleName']
movies_df.columns = ['movieId', 'title', 'year', 'producerId', 'genre', 'summary', 'countryCode']

# Ensure all movie IDs from B6 to B24 are included
movie_ids = movies_df['movieId'].dropna().astype(int)

# Clean the Role table by keeping only the rows where Movie ID is in the Movies table
cleaned_roles_df = roles_df[roles_df['movieId'].isin(movie_ids)]

# Save the cleaned Role table to a new Excel file
cleaned_file_path = './data/Cleaned_Movies_Data.xlsx'
with pd.ExcelWriter(cleaned_file_path) as writer:
    cleaned_roles_df.to_excel(writer, sheet_name='Cleaned_Role_Table', index=False)

cleaned_file_path

