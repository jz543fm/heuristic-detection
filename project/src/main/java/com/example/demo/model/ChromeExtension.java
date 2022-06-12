package com.example.demo.model;


import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.util.List;

public class ChromeExtension {

    public static final String EXTENSION_URL_PROTOCOL = "chrome-extension://";
    public static final String EXTENSION_SITE_BACKGROUND_URL = "/background.html";
    public static final String EXTENSION_INSPECT_PAGE = "chrome://inspect/#extensions";

    /**
     * The name of the extension. Have a look in your extension manifest.json, if you are not sure.
     */
    private String name;

    /**
     * The chrome webdriver we want to use.
     */
    private RemoteWebDriver driver;

    /**
     * This is the id our extension has on the remote browser.
     */
    private String extensionId;

    public ChromeExtension(RemoteWebDriver driver, String extensionName) {
        this.driver = driver;
        this.name = extensionName;
    }

    public String getId() {
        if (extensionId != null) {
            // if we have already the id, there is no need to do it twice.
            return extensionId;
        }

        // on this site every extension will be shown
        driver.get(EXTENSION_INSPECT_PAGE);

        // This element we want to find:
		/*
		<div class="subrow">
			<div class="name">Firespotting! Interesting Ideas, Every Day!</div>
			<div class="url">chrome-extension://abcdefghijklm/background.html</div>
		</div>
		 */

        // get the extensions list
        List<WebElement> divList = driver.findElements(By.className("properties-box"));

        for (WebElement elem : divList) {
            // get name element and check, if this is the extension
            WebElement nameElement = elem.findElement(By.className("name"));
            if (!nameElement.getText().equals(this.name)) {
                continue;
            }
            // it is the extension, so we have to find the id
            WebElement linkElement = elem.findElement(By.className("url"));
            String part = linkElement.getText();
            // we check, if we got the background.html link
            if (part.startsWith(EXTENSION_URL_PROTOCOL) && part.endsWith(EXTENSION_SITE_BACKGROUND_URL)) {
                // removing all "overhead"
                part = part.replace(EXTENSION_URL_PROTOCOL, "");
                part = part.replace(EXTENSION_SITE_BACKGROUND_URL, "");
                extensionId = part;
                return part;
            }
        }

        // we should not reach this line. If we reach it, that means our extension is not installed correctly.
        return null;
    }



    public void navigateTo(String page) {
        driver.get(EXTENSION_URL_PROTOCOL + getId() + "/" + page);
    }


    public void switchToFirstTab() {
        driver.switchTo().window((String) driver.getWindowHandles().toArray()[0]);
    }


    public void switchToNewTab() {
        int numberOfWindowHandles = driver.getWindowHandles().size();
        driver.switchTo().window((String) driver.getWindowHandles().toArray()[numberOfWindowHandles - 1]);
    }

    public RemoteWebDriver getDriver() {
        return this.driver;
    }


    public void tearDown() {
        this.driver.close();
        this.driver.quit();
    }
}
