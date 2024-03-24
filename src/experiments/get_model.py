# use selenium to get the model from cgtrader using the url
# https://www.cgtrader.com/3d-models/flag?free=1&file_types[]=21
import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import argparse


def main():
    # parse query from the cli args
    parser = argparse.ArgumentParser(description="Get the model from cgtrader")
    parser.add_argument("query", type=str, help="The query to search for")
    parser.add_argument("path", type=str, help="The directory to download the model to")
    args = parser.parse_args()
    query = args.query
    path = args.path

    # get list of all files in the downloads folder
    files = os.listdir(path)

    # create a new instance of the chrome driver
    driver = webdriver.Chrome()
    # go to the cgtrader website
    driver.get(f"https://www.cgtrader.com/3d-models/{query}?free=1&file_types[]=21")
    # click the first model
    links = driver.find_elements(By.CLASS_NAME, "cgt-model-card__link")
    first_link = links[0].get_attribute("href")
    driver.get(first_link)

    # click the download button by the text "free download"
    download_page_button = driver.find_element(By.LINK_TEXT, "Free download")
    download_page_link = download_page_button.get_attribute("href")
    driver.get(download_page_link)

    download_button = driver.find_element(By.LINK_TEXT, "Download")
    download_link = download_button.get_attribute("href")
    driver.get(download_link)

    # wait for the download to start
    time.sleep(20)
    # close the browser
    driver.close()
    # get the file name
    new_files = os.listdir(path)
    file = list(set(new_files) - set(files))[0]
    # move the file to the current directory
    os.system(f"mv ~/Downloads/{file} ./{file}")
    # print the file name
    print(file)


if __name__ == "__main__":
    main()
