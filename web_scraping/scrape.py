from selenium import webdriver
from selenium.webdriver.common.by import By
import os
currentDirectory = os.getcwd()
if not os.path.exists('scrape_results'):
    os.makedirs('scrape_results')

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(chrome_options=options, executable_path=currentDirectory + "/chromedriver.exe")

# https://www.silverlakemobility.com/plugins/WebPlugIn?type=1-1&action={}&email=fongyoong8@gmail.com&data=hSiJpBIcBFFMPGRgXWckfA==
# https://www.silverlakemobility.com/plugins/WebPlugIn?type={}&email=fongyoong8@gmail.com&data=v6HVSSWR+DGJWVuqTGCNyQ==

for i in range(0, 1000, 1):
    driver.get('https://www.silverlakemobility.com/plugins/WebPlugIn?type={}&email=fongyoong8@gmail.com&data=v6HVSSWR+DGJWVuqTGCNyQ=='.format(i))
    body = driver.find_elements(By.XPATH, '//body')[0]
    children = body.find_elements_by_css_selector("*")
    if len(children) > 0:
        driver.save_screenshot("scrape_results\\{}.png".format(i))

driver.close()