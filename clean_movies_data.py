import pandas as pd
import os

# Define a function to load and process the Internet_user Table
def load_and_process_internet_user_table(file_path, sheet_name, data_range, header_row):
    print(f"Processing {sheet_name} from {file_path}...")
    
    # Load the data from the specified sheet and range, ensuring the headers start from the correct row
    df = pd.read_excel(file_path, sheet_name=sheet_name, usecols=data_range, header=header_row)
    
    # Print the columns to debug
    print(f"Columns in {sheet_name} DataFrame:", df.columns)

    # Check for an email column
    if 'email' in df.columns:
        initial_count = len(df)
        # Ensure the email column contains unique values by dropping duplicates
        df.drop_duplicates(subset='email', inplace=True)
        final_count = len(df)
        removed_count = initial_count - final_count
        print(f"Removed {removed_count} duplicate email rows from {sheet_name}.")
        # Reset the index for the dataframe
        df.reset_index(drop=True, inplace=True)
    else:
        print("No email column found in the sheet.")
        print(f"Columns in {sheet_name} DataFrame after setting headers: {df.columns}")
    
    return df

# Define a function to load and process the Role and Movie tables
def load_and_process_role_table(file_path):
    print(f"Processing Role Table from {file_path}...")
    
    # Load the Excel file
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
    initial_count = len(roles_df)
    cleaned_roles_df = roles_df[roles_df['movieId'].isin(movie_ids)]
    final_count = len(cleaned_roles_df)
    removed_count = initial_count - final_count
    print(f"Removed {removed_count} rows from Role Table that do not have matching Movie IDs.")
    
    return cleaned_roles_df, movies_df

# Define a function to load and process the Score Movie table
def load_and_process_score_movie_table(file_path, internet_user_df):
    print(f"Processing Score Movie Table from {file_path}...")
    
    # Load the Score Movie table into a DataFrame
    score_movie_df = pd.read_excel(file_path, sheet_name='Score_movie Table', skiprows=6, usecols='F:H', nrows=200)
    
    # Print columns to debug
    print(f"Columns in Score Movie Table DataFrame:", score_movie_df.columns)
    
    # Check if the 'email' column exists in both dataframes
    if 'email' not in score_movie_df.columns:
        print("No email column found in the Score Movie Table.")
        return score_movie_df
    
    if 'email' not in internet_user_df.columns:
        print("No email column found in the Internet_user Table.")
        return score_movie_df

    # Ensure the email column in the Score Movie table only contains emails that exist in the Internet_user Table
    initial_count = len(score_movie_df)
    cleaned_score_movie_df = score_movie_df[score_movie_df['email'].isin(internet_user_df['email'])]
    final_count = len(cleaned_score_movie_df)
    removed_count = initial_count - final_count
    print(f"Removed {removed_count} rows from Score Movie Table that have emails not found in Internet_user Table.")
    
    return cleaned_score_movie_df

# Define a function to save the cleaned data to a new Excel file
def save_cleaned_data_to_new_excel(file_path, cleaned_roles_df, movies_df, cleaned_score_movie_df, role_sheet_name, movie_sheet_name, score_movie_sheet_name):
    # Create a new file path with "clean_" prefixed to the original file name
    dir_name, file_name = os.path.split(file_path)
    new_file_name = f"Clean_{file_name}"
    new_file_path = os.path.join(dir_name, new_file_name)
    
    print(f"Saving cleaned data to {new_file_path}...")
    
    # Create a new workbook and add the cleaned data
    with pd.ExcelWriter(new_file_path) as writer:
        print(f"Writing {role_sheet_name} to {new_file_path}...")
        cleaned_roles_df.to_excel(writer, sheet_name=role_sheet_name, index=False)
        print(f"Writing {movie_sheet_name} to {new_file_path}...")
        movies_df.to_excel(writer, sheet_name=movie_sheet_name, index=False)
        print(f"Writing {score_movie_sheet_name} to {new_file_path}...")
        cleaned_score_movie_df.to_excel(writer, sheet_name=score_movie_sheet_name, index=False, startrow=0, startcol=0)
    
    print(f"All cleaned data saved to: {new_file_path}")
    return new_file_path

# Define a main function to perform all cleaning tasks
def main():
    file_path = './data/Movies Data.xlsx'
    internet_user_sheet_name = 'Internet_user Table'  # Replace with the name of the sheet you want to process
    internet_user_data_range = "F:H"  # Column range from F to H
    header_row = 6  # Row number for the headers (0-based index)

    # Load and process the Internet_user Table
    df_processed = load_and_process_internet_user_table(file_path, internet_user_sheet_name, internet_user_data_range, header_row)

    # Load and process the Role table
    cleaned_roles_df, movies_df = load_and_process_role_table(file_path)

    # Load and process the Score Movie table
    cleaned_score_movie_df = load_and_process_score_movie_table(file_path, df_processed)

    # Save all cleaned data to a new Excel file
    new_file_path = save_cleaned_data_to_new_excel(
        file_path, 
        cleaned_roles_df, 
        movies_df, 
        cleaned_score_movie_df, 
        'Cleaned_Role_Table',
        'Movie_Table',
        'Cleaned_Score_Movie_Table'
    )
    
    print(f"All cleaned data saved to: {new_file_path}")

# Execute the main function
if __name__ == "__main__":
    main()

